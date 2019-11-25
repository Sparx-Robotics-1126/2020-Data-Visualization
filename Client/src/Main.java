import java.io.IOException;
import java.util.Scanner;

public class Main {

    public static double x;

    public static void main(String[] args) throws IOException {
        Scanner scan = new Scanner(System.in);
        Client client = new Client("Test") {
            @Override
            public double getXValue() {
                return getX();
            }
        };

        while(true){
            x = scan.nextDouble();
            client.run();
        }
    }

    public static double getX(){
        return x;
    }
}
