package Actors

import javax.inject.Inject

import akka.actor.{Props, Actor}
import akka.routing.RoundRobinPool
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.concurrent.Akka
import play.api.libs.mailer.MailerClient

/**
 * Created by carlos on 17/11/15.
 */
class MultEmailWork @Inject()(mailer: MailerClient, val messagesApi: MessagesApi) extends Actor with I18nSupport {


  def receive = {
    ???
  }
}

object MultEmailWork {
  import play.api.Play.current

  val route = RoundRobinPool(10)
  val props = Props[MultEmailWork].withRouter(route)
  val emailSystem = Akka.system.actorOf(props, name = "multEmailWorker")
}
