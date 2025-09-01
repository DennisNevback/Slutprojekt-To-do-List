namespace TodoApi.Dtos.Todo
{
  public class UpdateTodoUserDto
  {
    public required string title { get; set; }
    public string? description { get; set; }
    public DateTime? due_date { get; set; }
    public string? priority { get; set; }
    public string? status { get; set; }
    public DateTime? created_at { get; set; }
  }
}