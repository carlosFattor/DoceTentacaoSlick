package Actors

import javax.inject.Inject

import akka.actor.Status.{Failure => ActorFailure}
import akka.actor.SupervisorStrategy.{Escalate, Restart, Stop, Resume}
import akka.actor._
import akka.routing.BalancingPool
import models.Contact
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.concurrent.Akka
import play.api.libs.mailer._
import utils.Responses.ContactUnavailable

/**
 * Created by carlos on 15/11/15.
 */
class EmailManager @Inject()(mailer: MailerClient, val messagesApi: MessagesApi) extends Actor with I18nSupport {

  private val workerContact = "Contact"
  private var workers = Map[String, ActorRef]()

  override val supervisorStrategy = OneForOneStrategy() {
    case _: ArithmeticException => Resume
    case _: IllegalArgumentException => Stop
    case _: IllegalStateException => Restart
    case _: Exception => Escalate
  }

  override def preStart = {
    val workerCont = context.actorOf(Props(new EmailActor(mailer)), "emailToContact")

    workers= workers + (workerContact -> workerCont)
  }

  private def generateEmailContact(contact: Contact): Seq[Email] ={
    contact.generateEmailContact(messagesApi("email.subject"))
  }

  private def sendEmailContact(contact: Contact): Unit ={
    val workRef = workers.get(workerContact)

    workRef.fold{
      sender ! ActorFailure(ContactUnavailable(contact))
    }{ worker =>
      generateEmailContact(contact).par.foreach(email => worker forward email)
    }
  }

  def receive = {
    case contact: Contact => sendEmailContact(contact)
  }
}

object EmailManager {
  import play.api.Play.current

  val route = BalancingPool(4)
  val system = ActorSystem("EmailManager")
  def props = Props[EmailManager].withRouter(route)
  val emailSystem = system.actorOf(props, name = "emailWorker")
  def getSelection = Akka.system.actorSelection("/email/emailWorker")
}