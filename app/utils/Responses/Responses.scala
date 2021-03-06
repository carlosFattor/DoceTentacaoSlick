package utils.Responses

import models.{Contact, User}
import play.api.libs.json._

/**
 * Created by carlos on 16/10/15.
 */
case class AvailabilityResponse(result: String, availability: Option[User])

object AvailabilityResponse {
  implicit val responseFormat = Json.format[AvailabilityResponse]
}

case class ErrorResult(status: Int, message: String)
object ErrorResult{
  implicit val format: Format[ErrorResult] = Json.format[ErrorResult]
}

case class EndpointResponse(result: String,
                            response: JsValue,
                            error: Option[ErrorResult]) {
}

object EndpointResponse {
  implicit val format: Format[EndpointResponse] = Json.format[EndpointResponse]
}

object ErrorResponse {

  def apply(status: Int, message: String) = {
    EndpointResponse("NOK", JsNull, Option(ErrorResult(status, message)))
  }
}

object SuccessResponse {
  def apply[A](successResponse: A)(implicit w: Writes[A]) = {
    EndpointResponse("OK", Json.toJson(successResponse), None)
  }
}

case class ContactUnavailable(cont: Contact) extends Throwable