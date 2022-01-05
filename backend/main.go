package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/xyliew25/task-manager/router"
)

func main() {
	// Initialize router
	r := router.Router()

	// Log router status
	fmt.Println("Starting server on port 8000...")

	// Start server
	log.Fatal(http.ListenAndServe(":8000", r))
}
