import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.Map;

public class Handler implements RequestHandler<Map<String, Object>, Object> {

    private static Map<String, Object> response;

    /**
     * Handles a Lambda Function request.
     * @param event The Lambda Function event.
     * @param context The Lambda execution environment context object.
     * @return The Lambda Function output.
     */
    @Override
    public Object handleRequest(Map<String, Object> event, Context context) {
        System.out.println("Hello World!");
        return response.put("someText", "Hello World!");
    }
}