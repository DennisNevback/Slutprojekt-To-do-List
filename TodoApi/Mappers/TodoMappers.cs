using TodoApi.Models;
using TodoApi.Dtos.Todo;

namespace TodoApi.Mappers
{
  public static class TodoMappers
  {
    public static Todo ToCreateTodoDto(this CreateTodoDto todoModel)
    {
      return new Todo
      {
        user_id = todoModel.user_id,
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