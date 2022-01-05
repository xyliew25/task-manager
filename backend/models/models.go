package models

type Task struct {
	Id     int    `json:"id"`
	Title  string `json:"title"`
	Desc   string `json:"desc"`
	Tag    string `json:"tag"`
	IsDone bool   `json:"isDone"`
}
