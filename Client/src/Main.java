import java.io.IOException;
import java.util.Scanner;

public class Main {

    public static Scanner scan;

    public static void main(String[] args) throws IOException {
        scan = new Scanner(System.in);
        new Client("Test") {
            @Override
            public double getXValue() {
                return getX();
            }
        }.start();
    }

    public static double getX(){
    	return scan.nextDouble();
    }
}
