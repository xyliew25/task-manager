package middleware

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/xyliew25/task-manager/models"
)

func createConnection() *sql.DB {
	// Good practice to store sensitive data in environment variables
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	db, err := sql.Open("postgres", os.Getenv("POSTGRES_URL"))
	if err != nil {
		panic(err)
	}
	err = db.Ping()
	if err != nil {
		panic(err)
	}
	return db
}

func GetTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	tasks, err := getTasks()
	if err != nil {
		log.Fatalf("Unable to get tasks: %v\n", err)
	}
	json.NewEncoder(w).Encode(tasks)
}

func getTasks() ([]models.Task, error) {
	db := createConnection()
	// defer statement runs at end of function
	defer db.Close()
	tasks := []models.Task{}
	sqlStmt := `SELECT * FROM tasks`
	rows, err := db.Query(sqlStmt)
	if err != nil {
		log.Fatalf("Unable to execute query: %v\n", err)
	}
	defer rows.Close()
	for rows.Next() {
		var task models.Task
		err = rows.Scan(&task.Id, &task.Title, &task.Desc, &task.Tag, &task.IsDone)
		if err != nil {
			log.Fatalf("Unable to scan row: %v\n", err)
		}
		tasks = append(tasks, task)
	}
	return tasks, err
}

func GetTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		log.Fatalf("Unable to convert id string to integer: %v\n", err)
	}
	task, err := getTask(id)
	if err != nil {
		log.Fatalf("Unable to get task: %v\n", err)
	}
	json.NewEncoder(w).Encode(task)
}

func getTask(id int) (models.Task, error) {
	db := createConnection()
	defer db.Close()
	var task models.Task
	sqlStmt := `SELECT * FROM tasks WHERE id=$1`
	err := db.QueryRow(sqlStmt, id).Scan(&task.Title, &task.Desc, &task.Tag, &task.IsDone)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("No rows returned")
		return task, nil
	case nil:
		return task, nil
	default:
		log.Fatalf("Unable to scan row: %v\n", err)
	}
	return task, err
}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var newTask models.Task
	err := json.NewDecoder(r.Body).Decode(&newTask)
	if err != nil {
		log.Fatalf("Unable to decode request body: %v\n", err)
	}
	taskCreated := insertTask(newTask)
	json.NewEncoder(w).Encode(taskCreated)
}

func insertTask(task models.Task) models.Task {
	db := createConnection()
	defer db.Close()
	sqlStmt := `INSERT INTO tasks (title, description, tag, is_done) VALUES ($1, $2, $3, $4) RETURNING id`
	err := db.QueryRow(sqlStmt, task.Title, task.Desc, task.Tag, task.IsDone).Scan(&task.Id)
	if err != nil {
		log.Fatalf("Unable to execute query: %v\n", err)
	}
	fmt.Printf("Successfully created a task with id %v\n", task.Id)
	return task
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	if (*r).Method == "OPTIONS" {
		return
	}
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		log.Fatalf("Unable to convert id string to integer: %v\n", err)
	}
	var task models.Task
	err = json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		log.Fatalf("Unable to decode request body: %v\n", err)
	}
	updateTask(id, task)
	json.NewEncoder(w).Encode(task)
}

func updateTask(id int, task models.Task) {
	db := createConnection()
	defer db.Close()
	sqlStmt := `UPDATE tasks SET title=$2, description=$3, tag=$4, is_done=$5 WHERE id=$1`
	res, err := db.Exec(sqlStmt, id, task.Title, task.Desc, task.Tag, task.IsDone)
	if err != nil {
		log.Fatalf("Unable to execute query: %v\n", err)
	}
	rowsAffected, err := res.RowsAffected()
	if err != nil {
		log.Fatalf("Error while checking affected rows: %v\n", err)
	}
	if rowsAffected == 1 {
		fmt.Printf("Successfully updated task with id %v\n", id)
	}
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		log.Fatalf("Unable to convert id string to integer: %v\n", err)
	}
	deleteTask(id)
	json.NewEncoder(w).Encode(id)
}

func deleteTask(id int) {
	db := createConnection()
	defer db.Close()
	sqlStmt := `DELETE FROM tasks WHERE id=$1`
	res, err := db.Exec(sqlStmt, id)
	if err != nil {
		log.Fatalf("Unable to execute query: %v\n", err)
	}
	rowsAffected, err := res.RowsAffected()
	if err != nil {
		log.Fatalf("Error while checking affected rows: %v\n", err)
	}
	if rowsAffected == 1 {
		fmt.Printf("Successfully deleted task with id %v\n", id)
	}
}
