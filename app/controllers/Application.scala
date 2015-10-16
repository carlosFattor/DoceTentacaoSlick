package controllers

import play.api.libs.json.Json
import play.api.mvc._
import play.api.routing.JavaScriptReverseRouter

class Application extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  val myList = List(1 to 10)

  def list = Action {
    Ok(Json.toJson(myList))
  }

  def jsRoutes = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        routes.javascript.Application.list
      )).as("text/javascript")
  }
}