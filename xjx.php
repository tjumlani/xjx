<?php
    class xjx {
        static $cmd = [];

        static function clearCmd() {
            self::$cmd = [];
        }

        static function out($valid = true) {
            if(!$valid) {
                echo json_encode(self::$cmd);
                die;    
            }

            echo json_encode(self::$cmd);
            die;
        }

        static function val() {
            $n = func_num_args();

            if($n == 2) {
                $e = func_get_arg(0);
                $v = func_get_arg(1);
                self::$cmd[] = [ "cmd" => "val", "el" => $e, "value" => $v ];
            }

            if($n % 2 > 0) {
                throw new Exception("Invalid number of parameters / arguments...");
            }

            $count = $n / 2;

            for($i = 0; $i <= $count; $i+=2) {
                $e = func_get_arg($i);
                $v = func_get_arg($i+1);
                self::$cmd[] = [ "cmd" => "val", "el" => $e, "value" => $v ];
            }
        }
        
        static function alert($message) {
            self::$cmd[] = [ "cmd" => "alert", "message" => $message ];
        }
        
        static function html() {
            $n = func_num_args();

            if($n == 2) {
                $e = func_get_arg(0);
                $html = func_get_arg(1);
                self::$cmd[] = [ "cmd" => "html", "el" => $e,"html" => $html ];
            }

            if($n % 2 > 0) {
                throw new Exception("Invalid number of parameters / arguments...");
            }

            $count = $n / 2;

            for($i = 0; $i <= $count; $i+=2) {
                $e = func_get_arg($i);
                $html = func_get_arg($i+1);
                self::$cmd[] = [ "cmd" => "html", "el" => $e,"html" => $html ];
            }
        }
        
        static function click($e) {
            self::$cmd[] = [ "cmd" => "click", "el" => $e ];
        }
        
        static function css($e, $css) {
            self::$cmd[] = [ "cmd" => "css", "el" => $e, "css" => $css ];
        }
        
        static function append($e, $html) {
            self::$cmd[] = [ "cmd" => "append", "el" => $e, "html" => $html ];
        }
        
        static function prepend($e, $html) {
            self::$cmd[] = [ "cmd" => "prepend", "el" => $e, "html" => $html ];
        }
        
        static function remove($e) {
            self::$cmd[] = [ "cmd" => "remove", "el" => $e ];
        }
        
        static function check($e, $v = null) {
            if(!$v) {
                self::$cmd[] = [ "cmd" => "check", "el" => $e ];
                return;
            }

            self::$cmd[] = [ "cmd" => "check", "el" => $e, 'value' => $v ];
        }
        
        static function unCheck($e) {
            self::$cmd[] = [ "cmd" => "uncheck", "el" => $e ];
        }
        
        static function select($e, $v) {
            self::$cmd[] = [ "cmd" => "select", "el" => $e, "value" => $v ];
        }
        
        static function unSelect($e, $v) {
            self::$cmd[] = [ "cmd" => "unselect", "el" => $e, 'value' => $v ];
        }
        
        static function js($js) {
            self::$cmd[] = [ "cmd" => "js", "js" => $js ];
        }
        
        static function clear($e) {
            self::$cmd[] = [ "cmd" => "clear", "el" => $e ];
        }
        
        static function hide($e) {
            self::$cmd[] = [ "cmd" => "hide", "el" => $e ];
        }
        
        static function show($e) {
            self::$cmd[] = [ "cmd" => "show", "el" => $e ];
        }

        static function toggle($e) {
            self::$cmd[] = [ "cmd" => "toggle", "el" => $e ];
        }
        
        static function refresh() {
            self::$cmd[] = [ "cmd" => "refresh" ];
        }
        
        static function redirect($url) {
            self::$cmd[] = [ "cmd" => "redirect", "url" => $url ];
        }

        static function prop($e, $p, $v) {
            self::$cmd[] = [ "cmd" => "prop", "el" => $e, 'value' => $v, "prop" => $p ];
        }

        static function bBox($message, $title = 'Alert !!!', $large = 0 ) {
            self::$cmd[] = [ "cmd" => "bBox", 'message' => $message, 'title' => $title, 'large' => $large ];
        }

        static function debug($param) {
            self::$cmd[] = [ "cmd" => "debug", 'param' => "<pre>" . htmlspecialchars(print_r($param, 1), ENT_QUOTES) . "</pre>"];
        }

        static function addClass($e, $class) {
            self::$cmd[] = [ "cmd" => "addClass", 'el' => $e, 'class' => $class ];
        }

        static function removeClass($e, $class) {
            self::$cmd[] = [ "cmd" => "removeClass", 'el' => $e, 'class' => $class ];
        }

        static function disable($e) {
            self::$cmd[] = [ "cmd" => "disable", 'el' => $e ];
        }

        static function enable($e) {
            self::$cmd[] = [ "cmd" => "enable", 'el' => $e ];
        }

        static function readOnly($e, $flag = true) {
            self::$cmd[] = [ "cmd" => "readOnly", 'el' => $e, 'flag' => $flag ];
        }

        static function focus($e) {
            self::$cmd[] = [ "cmd" => "focus", 'el' => $e ];
        }

        static function scrollTo($e, $speed = 'fast') {
            self::$cmd[] = [ "cmd" => "scrollTo", 'el' => $e, 'speed' => $speed ];
        }

        static function modalHide($e) {
            self::$cmd[] = [ "cmd" => "modalHide", 'el' => $e ];
        }

        static function modalShow($e) {
            self::$cmd[] = [ "cmd" => "modalShow", 'el' => $e ];
        }

        // define the onClick function of an element
        // $e -- element name or id
        // $function -- function definition /construct
        // e.g. tj::onClick('#e', "function sayHello() { alert('hello'); };)");
        static function onClick($e, $function) {
            self::$cmd[] = [ "cmd" => "onClick", 'el' => $e, 'function'=> $function ];
        }

        // call js function with variable number of arguments
        // e.g. xjx::call(jsfunction, arg1, arg2...., argN);
        static function call() {
            $params = func_get_args(); // put all arguments into an array
            $method = $params[0]; // first argument is the method or function to call
            array_shift($params); // remove first argument
            if(!$params) {
                $params = null;
            }
            self::$cmd[] = ['cmd' => 'call', 'method', $method, 'params' => $params ];
        }

        static function insertJsFile($el, $jsFileUrl) {
            $el = str_replace("#", "", $el); // remove # sign just in case, as $el will be the id of the container
            self::$cmd[] = [ 'cmd' => 'insertJsFile', 'el' => $el, 'jsFileUrl' => $jsFileUrl ];
        }

        static function removeJs($el) {
            $el = str_replace("#", "", $el); // remove # sign just in case, as $el will be the id of the container
            self::$cmd[] = [ 'cmd' => 'removeJs', 'el' => $el ];
        }

        static function appendJs($el, $js) {
            $el = str_replace("#", "", $el); // remove # sign just in case, as $el will be the id of the container
            self::$cmd[] = [ 'cmd' => 'appendJs', 'el' => $el, 'js' => $js ];
        }

        static function view($template, $d = null) {
            if($d) {
                extract($d);
            }
    
            if(!substr_count($template, ".php")) {
                $template .= ".php";
            }
    
            ob_start();
            include_once  $template;
            $response	= ob_get_contents();
            ob_end_clean();           
    
            return utf8_encode(str_replace("\t\t", "\t", $response));
        }
    }
    
    function xjxHandler() {
        $json = $_POST;
                
        // if the submit type is a form post submission
        if($json['submitType'] == 'POST') {
        
            $method = $json['method']; // user defined mehtod / function to call
            
            // get the form fields
            $formParams = json_decode($json['formParams'], true);
            $form = [];
            $form[] = $formParams;
            
            // get additional parameters if there any
            if(!isset($json['additionalParams'])) {
                return call_user_func_array($method, $form);
            }
            
            $additionalParams = $json['additionalParams'];

            // only form fields submitted
            if(!$additionalParams or empty($additionalParams)) {
                // call method or function and pass the
                // formfields as an array
                return call_user_func_array($method, $form);
            }

            // form fields and parameters are submitted
            $queryP = [];

            foreach($additionalParams as $q) {
                $queryP[] = $q;
            }
            
            $params = [];
            $params[] = $formParams;

            // merge the formfields array and additional parameter arrays
            $params = array_merge($params, $queryP);

            // call method or function and pass the
            // formfields and parameters as an array
            return call_user_func_array($method, $params);
        } 

        // if the submit type is a form 'GET' submission
        $method = $json['method']; // get user defined method or function
        
        if(!isset($json['queryParams'])) {
            return $method();
        }
        
        $queryParams = $json['queryParams'];
        
        if(!$queryParams or empty($queryParams)) {
            return $method();
        }

        $queryP = [];

        foreach($queryParams as $q) {
            $queryP[] = $q;
        }
        
        return call_user_func_array($method, $queryP);
    }
    
    if(isset($_POST['_xjxEngine'])) {
        xjxHandler();
    }