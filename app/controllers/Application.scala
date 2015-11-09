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

  /**
   * Provides the desired template.
   *
   * @param template The template to provide.
   * @return The template.
   */
  def view(template: String) = Action { implicit request =>
    template match {
      case "home" => Ok(views.html.home())
      case "produtos" => Ok(views.html.produtos())
      case "categorias" => Ok(views.html.categorias())
      case "galeria" => Ok(views.html.galeria())
      case "contato" => Ok(views.html.contato())
      case "saiba" => Ok(views.html.saiba())
      case _ => NotFound
    }
  }

  def jsRoutes = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        routes.javascript.Application.list
      )).as("text/javascript")
  }
}