package security

/**
 * Created by carlos on 16/10/15.
 */

import play.api.libs.json.Json
import play.api.mvc._
import utils.Responses.ErrorResponse
import scala.concurrent.Future
import play.api.mvc.Results._

class UserRequest[A](val email: Option[String], request: Request[A]) extends WrappedRequest[A](request)

class AuthenticatedRequest[A](val email: String, request: Request[A]) extends WrappedRequest[A](request)

object UserAction extends ActionBuilder[UserRequest] with ActionTransformer[Request, UserRequest] {
  def transform[A](request: Request[A]) = Future.successful {
    new UserRequest(request.session.get("email"), request)
  }
}

object Authenticated extends ActionBuilder[AuthenticatedRequest] with Controller {
  def invokeBlock[A](request: Request[A], block: (AuthenticatedRequest[A]) => Future[Result]) = {
    request.session.get("email").map { email =>
      block(new AuthenticatedRequest(email, request))
    } getOrElse {
      Future.successful(Forbidden(Json.toJson(ErrorResponse(FORBIDDEN, request.uri))))
    }
  }
}