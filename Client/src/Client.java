import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;

public abstract class Client {

    private String name;
    private PrintWriter writer;
    private long startTime;

    public Client(String name) throws IOException {
        this.name = name;
        writer = new PrintWriter(new Socket("localhost", 8080).getOutputStream());
        startTime = System.currentTimeMillis();
    }

    public void run() {
        long time = System.currentTimeMillis() - startTime;
        String json = "{\"name\": \"" + name + "\", \"timestamp\": " + time  + ", \"x\": " + getXValue() + "}";
        writer.print(json);
        writer.flush();
    }

    public abstract double getXValue();
}
