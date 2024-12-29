use actix_web::{web, App, HttpServer, Responder, HttpResponse};

// Basic handler for the index route
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello, Actix!")
}

// Handler for a JSON endpoint
async fn json_example() -> impl Responder {
    web::Json(serde_json::json!({
        "message": "Hello, JSON!",
        "status": "success"
    }))
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index)) // Register index route
            .route("/json", web::get().to(json_example)) // Register JSON route
    })
    .bind("127.0.0.1:8080")? // Bind to localhost on port 8080
    .run()
    .await
}
