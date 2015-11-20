package controllers

import javax.inject.Inject

import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc._
import play.api.routing.JavaScriptReverseRouter

import scala.concurrent.Future

class Application @Inject()(val messagesApi: MessagesApi) extends Controller with I18nSupport {

  def index = Action {
    Ok(views.html.index())
  }

  def indexManager = Action {
    Ok(views.html.manager.index())
  }

  val myList = List(1 to 10)

  def list = Action {
    Ok(Json.toJson(myList))
  }

  def viewManager(template: String) = Action.async { implicit request =>
    Future.successful(
      template match {
        case "home" => Ok(views.html.manager.home())
        case "aside" => Ok(views.html.manager.menu.aside())
        case _ => NotFound
      }
    )
  }

  def view(template: String) = Action.async { implicit request =>
    Future.successful(
      template match {
        case "home" => Ok(views.html.home())
        case "lista_produtos" => Ok(views.html.lista_produtos())
        case "produto" => Ok(views.html.produto())
        case "categorias" => Ok(views.html.categorias())
        case "galeria" => Ok(views.html.galeria())
        case "contato" => Ok(views.html.contato())
        case "saiba" => Ok(views.html.saiba())
        case "ui_alert" => Ok(views.html.alerts.ui_alert())
        case _ => NotFound
      }
    )
  }

  def jsRoutes = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
      )).as("text/javascript")
  }
}