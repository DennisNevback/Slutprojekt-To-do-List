using TodoApi.Models;
using TodoApi.Dtos.TodoUser;

namespace TodoApi.Mappers
{
  public static class TodoUserMappers
  {
    public static Todo ToCreateTodoUserDto(this CreateTodoUserDto todoModel, string user_id)
    {
      return new Todo
      {
        user_id = user_id,
        title = todoModel.title,
        description = todoModel.description,
        due_date = todoModel.due_date,
        priority = todoModel.priority,
        status = todoModel.status,
        created_at = todoModel.created_at
      };
    }
  }
}