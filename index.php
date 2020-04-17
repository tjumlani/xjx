<?php
    require_once("xjx.php");
    
    function saySomething() {
        xjx::alert('Hello World');
        xjx::html('#result', "Hello World...");
        xjx::out();
    }
    
    function echoBack($message1, $message2) {
        xjx::html('#result', "Echoing $message1...$message2");
        xjx::check('choices', 1);
        xjx::check('choices', 2);
        xjx::check('#choices3');

        //xjx::select('#select_multiple', 'saab'); // single selection based on id
        //xjx::select('#select_multiple', ['saab', 'volvo']); // multiple selection based on id

        //xjx::select('select_multiple', 'saab'); // single selection based on name
        xjx::select('select_multiple', ['saab', 'volvo']); // multiple selection
        xjx::out();
    }
    
    function Post1($f, $extra, $extra1) {
        xjx::clear('#debug');
        xjx::debug($f);
        xjx::uncheck('choices');
        xjx::uncheck('achoices[]');
        xjx::append("#result", "Value of typed is " . $f['typed']);
        
        xjx::out();
    }

    function postDivResult($f, $e1, $e2) {
        xjx::debug($f);
        xjx::html('#result', "Post Div variables : " . print_r($f, 1));
        xjx::append("#result", "Value of post_div_var1 is " . $f['post_div_var1']);
        xjx::out();            
    }

    $t = xjx::view("index.view");
    echo $t;