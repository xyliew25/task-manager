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
	r.HandleFunc("/tasks", middleware.CreateTask).Methods("POST")
	r.HandleFunc("/tasks/{id}", middleware.UpdateTask).Methods("PUT")
	r.HandleFunc("/tasks/{id}", middleware.DeleteTask).Methods("DELETE")

	// Return router
	return r
}
