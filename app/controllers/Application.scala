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

  def indexManager = Action { implicit request =>
    Ok(views.html.manager.index())
  }

  val myList = List(1 to 10)

  def list = Action {
    Ok(Json.toJson(myList))
  }

  def viewManager(template: String) = Action.async { implicit request =>
    Future.successful(
      template match {
        case "index" => Ok("")
        case "home" => Ok(views.html.manager.home())
        case "menu" => Ok(views.html.manager.menu.menu())
        case "aside" => Ok(views.html.manager.menu.aside())
        case "list_user" => Ok(views.html.manager.list.list_user())
        case "info_user" => Ok(views.html.manager.menu.info_user())
        case "info_home" => Ok(views.html.manager.infos.info_home())
        case "login_user" => Ok(views.html.manager.forms.login_user())
        case "confirmation_modal" => Ok(views.html.alerts.ui_confirmation_modal())
        case "list_category" => Ok(views.html.manager.list.lista_category())
        case "list_product" => Ok(views.html.manager.list.list_product())
        case "list_gallery" => Ok(views.html.manager.list.list_gallery())
        case "list_contact" => Ok(views.html.manager.list.list_contacts())
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