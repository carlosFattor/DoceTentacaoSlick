package modules


import Actors.EmailManager
import com.google.inject.AbstractModule
import play.api.libs.concurrent.AkkaGuiceSupport

/**
 * Created by carlos on 16/10/15.
 */
class DIModule extends AbstractModule with AkkaGuiceSupport{

  def configure(): Unit = {
    bindActor[EmailManager]("emailWork")
  }
}
