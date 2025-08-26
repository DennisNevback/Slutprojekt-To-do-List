using System;
using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
  public class Todo
  {
    [Key]
    public int id { get; set; }
    public required int user_id { get; set; }
    public required string title { get; set; }
    public string? description { get; set; }
    public DateTime? due_date { get; set; }
    public string? priority { get; set; }
    public string? status { get; set; }
    public DateTime? created_at { get; set; }
  }
}