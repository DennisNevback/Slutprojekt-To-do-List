using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TodoApi.Migrations
{
    /// <inheritdoc />
    public partial class userId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8a3d5c34-ccae-4712-af12-317f29a3bc6e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "be72b0a2-899f-49f2-934b-7b223b3ed72a");

            migrationBuilder.AlterColumn<string>(
                name: "user_id",
                table: "Todos",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "094beb61-fdc6-4760-bee1-737da5ea1957", null, "Admin", "ADMIN" },
                    { "e10f5cba-2f44-480d-a162-087dd2bc882e", null, "user", "User" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "094beb61-fdc6-4760-bee1-737da5ea1957");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e10f5cba-2f44-480d-a162-087dd2bc882e");

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                table: "Todos",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8a3d5c34-ccae-4712-af12-317f29a3bc6e", null, "user", "User" },
                    { "be72b0a2-899f-49f2-934b-7b223b3ed72a", null, "Admin", "ADMIN" }
                });
        }
    }
}
