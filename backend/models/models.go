package models

type Task struct {
	Id     string `json:"id"`
	Title  string `json:"title"`
	Desc   string `json:"desc"`
	Tag    string `json:"tag"`
	IsDone bool   `json:"isDone"`
}
