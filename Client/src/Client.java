package frc.robot;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetSocketAddress;
import java.net.Socket;

public abstract class Client extends Thread {

    private final String HOSTNAME = "10.11.26.169";//"10.11.26.1";
    private final int PORT = 8080;

    private String name;
    private Socket socket;
    private PrintWriter writer;
    private long startTime;

    public Client(String name) throws IOException {
        this.name = name;
        Socket socket = new Socket();
        socket.connect(new InetSocketAddress(HOSTNAME, PORT), 10000);
        writer = new PrintWriter(socket.getOutputStream(), true);
        startTime = System.currentTimeMillis();
    }

    @Override
    public void run() {
        while(true){
            long time = System.currentTimeMillis() - startTime;
            String json = "{\"name\": \"" + name + "\", \"timestamp\": " + time/1000 + ", \"x\": " + getXValue() + "}";
            writer.print(json);
            writer.flush();
            try {Thread.sleep(100);} catch (InterruptedException e) {}
        }
        // try { socket.close(); } catch (IOException e) {e.printStackTrace();}
    }

    public abstract double getXValue();
}
