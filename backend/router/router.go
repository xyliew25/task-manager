package router

import (
	"github.com/gorilla/mux"
	"github.com/xyliew25/task-manager/middleware"
)

func Router() *mux.Router {
	// Initialize router
	r := mux.NewRouter()

	// Handle routes
	r.HandleFunc("/tasks", middleware.GetTasks).Methods("GET")
	r.HandleFunc("/tasks/{id}", middleware.GetTask).Methods("GET")
	r.HandleFunc("/create-task", middleware.CreateTask).Methods("POST")
	r.HandleFunc("/update-task/{id}", middleware.UpdateTask).Methods("PUT", "OPTIONS")
	r.HandleFunc("/delete-task/{id}", middleware.DeleteTask).Methods("DELETE", "OPTIONS")

	// Return router
	return r
}
