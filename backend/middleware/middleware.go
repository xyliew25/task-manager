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

// Response format
// type response struct {
// 	Id      int    `json:"id,omitempty"`
// 	Message string `json:"message,omitempty"`
// }

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
	fmt.Println("Successfully connected to database")
	return db
}

func GetTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	tasks, err := getTasks()
	if err != nil {
		log.Fatalf("Unable to get tasks: %v", err)
	}
	json.NewEncoder(w).Encode(tasks)
}

func getTasks() ([]models.Task, error) {
	db := createConnection()
	// defer statement runs at end of function
	defer db.Close()
	var tasks []models.Task
	sqlStmt := `SELECT * FROM tasks`
	rows, err := db.Query(sqlStmt)
	if err != nil {
		log.Fatalf("Unable to execute query: %v", err)
	}
	defer rows.Close()
	for rows.Next() {
		var task models.Task
		err = rows.Scan(&task.Id, &task.Title, &task.Desc, &task.Tag, &task.IsDone)
		if err != nil {
			log.Fatalf("Unable to scan row: %v", err)
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
		log.Fatalf("Unable to convert id string to integer: %v", err)
	}
	task, err := getTask(id)
	if err != nil {
		log.Fatalf("Unable to get task: %v", err)
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
		log.Fatalf("Unable to scan row: %v", err)
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
		log.Fatalf("Unable to decode request body: %v", err)
	}
	taskCreated := insertTask(newTask)
	// res := response{Id: insertId, Message: "Task created successfully"}
	json.NewEncoder(w).Encode(taskCreated)
}

func insertTask(task models.Task) models.Task {
	db := createConnection()
	defer db.Close()
	sqlStmt := `INSERT INTO tasks (title, description, tag, is_done) VALUES ($1, $2, $3, $4) RETURNING id`
	// var id int
	err := db.QueryRow(sqlStmt, task.Title, task.Desc, task.Tag, task.IsDone).Scan(&task.Id)
	if err != nil {
		log.Fatalf("Unable to execute query: %v", err)
	}
	fmt.Printf("Inserted a single record %v", task.Id)
	return task
}

func UpdateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		log.Fatalf("Unable to convert id string to integer: %v", err)
	}
	var task models.Task
	err = json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		log.Fatalf("Unable to decode request body: %v", err)
	}
	updateTask(id, task)
	// updatedRows := updateTask(id, task)
	// msg := fmt.Sprintf("Task updated successfully. Total rows/records affected %v", updatedRows)
	// res := response{Id: id, Message: msg}
	json.NewEncoder(w).Encode(task)
}

func updateTask(id int, task models.Task) int {
	db := createConnection()
	defer db.Close()
	sqlStmt := `UPDATE tasks SET title=$2, description=$3, tag=$4, is_done=$5 WHERE id=$1`
	res, err := db.Exec(sqlStmt, id, task.Title, task.Desc, task.Tag, task.IsDone)
	if err != nil {
		log.Fatalf("Unable to execute query: %v", err)
	}
	rowsAffected, err := res.RowsAffected()
	if err != nil {
		log.Fatalf("Error while checking affected rows: %v", err)
	}
	fmt.Printf("Total rows/records affected %v", rowsAffected)
	return int(rowsAffected)
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	params := mux.Vars(r)
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		log.Fatalf("Unable to convert id string to integer: %v", err)
	}
	deleteTask(id)
	// deletedRows := deleteTask(id)
	// msg := fmt.Sprintf("Task updated successfully. Total rows/records affected %v", deletedRows)
	// res := response{Id: id, Message: msg}
	json.NewEncoder(w).Encode(id)
}

func deleteTask(id int) int {
	db := createConnection()
	defer db.Close()
	sqlStmt := `DELETE FROM tasks WHERE id=$1`
	res, err := db.Exec(sqlStmt, id)
	if err != nil {
		log.Fatalf("Unable to execute query: %v", err)
	}
	rowsAffected, err := res.RowsAffected()
	if err != nil {
		log.Fatalf("Error while checking affected rows: %v", err)
	}
	fmt.Printf("Total rows/records affected %v", rowsAffected)
	return int(rowsAffected)
}
