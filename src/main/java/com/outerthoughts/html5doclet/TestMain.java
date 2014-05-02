package com.outerthoughts.html5doclet;

import com.sun.tools.javadoc.Main;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;

/**
 * Created by arafalov on 5/2/14.
 */
public class TestMain {
    public static void main(String[] args) throws IOException {

        String targetDir = System.getProperty("user.dir") + "/javadoc-output";
        Files.createDirectories(FileSystems.getDefault().getPath(targetDir));

        /*
        This method of execution allows us to avoid providing classpath and also to use relative directory references
        Params:
            program name
            doclet name
            source path - our own source
            subpackages - one of our own packages
            output - a directory, relative to the project
        */
        Main.execute("HTML5-Doclet", "com.outerthoughts.html5doclet.formats.html.HtmlDoclet", new String[]{
                "-sourcepath", System.getProperty("user.dir") + "/src/main/java",
                "-subpackages", "com.outerthoughts.html5doclet.formats.html",
                "-d", targetDir
        });

    }
}
