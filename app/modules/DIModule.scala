package modules

import com.google.inject.AbstractModule
import models.Services.{UserServiceImp, UserService}
import play.api.libs.concurrent.AkkaGuiceSupport
import play.api.{Configuration, Environment}

/**
 * Created by carlos on 16/10/15.
 */
case class DIModule(environment: Environment, configuration: Configuration) extends AbstractModule with AkkaGuiceSupport{

  def configure() {
    bind(classOf[UserService]).to(classOf[UserServiceImp])
  }
}
