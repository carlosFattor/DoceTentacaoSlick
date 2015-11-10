package controllers

import javax.inject.Inject

import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc._
import play.api.routing.JavaScriptReverseRouter

class Application @Inject()(val messagesApi: MessagesApi) extends Controller with I18nSupport{

  def index = Action {
    Ok(views.html.index())
  }

  val myList = List(1 to 10)

  def list = Action {
    Ok(Json.toJson(myList))
  }

  def view(template: String) = Action { implicit request =>
    template match {
      case "home" => Ok(views.html.home())
      case "lista_produtos" => Ok(views.html.lista_produtos())
      case "produto" => Ok(views.html.produto())
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