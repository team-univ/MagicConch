package team.univ.magic_conch;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import team.univ.magic_conch.bundle.exception.BundleNotFoundException;
import team.univ.magic_conch.user.exception.UserNotFoundException;

@ControllerAdvice
public class ErrorController {

    @ExceptionHandler({UserNotFoundException.class, BundleNotFoundException.class})
    public String handleException() {
        return "error/404";
    }
}