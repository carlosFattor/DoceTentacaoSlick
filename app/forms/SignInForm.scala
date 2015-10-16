package forms

/**
 * Created by carlos on 16/10/15.
 */
import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.{Json, Format}

/**
 * The form which handles the submission of the credentials.
 */

/**
 * The form data.
 *
 * @param email The email of the user.
 * @param password The password of the user.
 */
case class SignInForm( email: String, password: String)
object SignInForm {

  implicit val SignIn: Format[SignInForm] = Json.format[SignInForm]

  /**
   * A play framework form.
   */
  val form = Form(
    mapping(
      "email" -> email,
      "password" -> nonEmptyText
    )(SignInForm.apply)(SignInForm.unapply)
  )
}
