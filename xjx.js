class cmdVal {
    process($r) {
        $($r.el).val($r.value);
    }
}

class cmdHtml {
    process($r) {
        $($r.el).html($r.html);
    }
}

class cmdAlert {
    process($r) {
        alert($r.message);
    }
}

class cmdAppend {
    process($r) {
        $($r.el).append($r.html);
    }
}

class cmdPrepend {
    process($r) {
        $($r.el).prepend($r.html);
    }
}
 
class cmdClear {
    process($r) {
        if($($r.el).is("input, textarea")) {
            $($r.el).val('');
            return;
        }

        if($($r.el).is('select')) {
            $($r.el).val([]).change();
            return;
        }

        if($($r.el).is("radio, checkbox")) {
            $($r.el).prop('checked', false);
            return;
        }

        $($r.el).html('');
    }
}
 
class cmdRemove {
    process($r) {
        $($r.el).remove();
    }
 }
 
 class cmdHide {
    process($r) {
        $($r.el).hide();
    }
}

class cmdShow {
    process($r) {
        $($r.el).show();
    }
}
 
class cmdJs {
    process($r) {
        var F = new Function ($r.js);
        F();
        //return(F());
        //var script = "<script type='text/javascript'> " + $r.js + " </script>";
        //$('body').append(script);
        //$.globalEval($r.js);
    }
}

class cmdRefresh {
    process() {
        location.reload();
    }
}

class cmdRedirect {
    process($r) {
        location.replace($r.url);
    }
}

class cmdProp {
    process($r) {
        $($r.el).prop($r.prop, $r.value);
    }
}

class cmdToggle {
    process($r) {
        $($r.el).toggle();
    }
}

class cmdCss {
    process($r) {
        $($r.el).css($r.css);
    }
}

class cmdClick {
    process($r) {
        $($r.el).click();                  
    }
}

class cmdAddClass {
    process($r) {
        $($r.el).addClass($r.class);    
    }
}

class cmdRemoveClass {
    process($r) {
        $($r.el).removeClass($r.class);
    }
}

class cmdDebug {
    process($r) {
        $('#debug').append("<div style='padding:5px'><pre>" + $r.param + "</pre></div>");
    }
}

class cmdCheck {
    process($r) {
        // if element is identified by id
        if($r.el.charAt(0) == '#') {
            $($r.el).prop('checked', true);
            return;
        }

        // if value is not defined, check all based on name
        if($r.value == undefined) {
            $("input[name='" + $r.el + "']:checkbox").prop('checked', true);
            return;
        }

        // check the checkbox based on name and value
        $('input[name="' + $r.el + '"][value="' + $r.value.toString() + '"]').prop("checked", true);
    }
}

// call a js function and pass the arguments if any
//https://stackoverflow.com/questions/10061389/javascript-equivalent-of-php-call-user-func
class cmdCall {
    process($r) {
        // with arguments
        if(!$r.params) {
            window[$r.method].apply(null);
            return;
        }
        // no arguments
        window[$r.method].apply(null, $r.params);
    }
}

class cmdUncheck {
    process($r) {
        // uncheck based on id
        if($r.el.charAt(0) == '#') {
            $($r.el).prop('checked', false);
            return;
        }

        // if value is not defined, uncheck all based on name
        if($r.value == undefined) {
            $("input[name='" + $r.el + "']:checkbox").prop('checked', false);
            return;
        }

        // uncheck the checkbox based on name and value
        $('input[name="' + $r.el + '"][value="' + $r.value.toString() + '"]').prop("checked", false);
    }
}

class cmdSelect {
    process($r) {
        // no value defined, do nothing
        if($r.value == undefined) {
            return;
        }

        // element is identified by id
        // does not matter if $r.value is single value or array of values
        if($r.el.charAt(0) == '#') {
            $($r.el).val($r.value);
            return;
        }

        // if $r.value is an array
        if($.isArray($r.value)) {
            for(var i in $r.value) {
                var v = $r.value[ i ];
                $('select[name="' + $r.el + '"] option[value="' + v + '"]').prop('selected', 'selected')
            }

            return;
        }

        $('select[name="' + $r.el + '"] option[value="' + $r.value + '"]').prop('selected', 'selected')
    }
}

class cmdUnselect {
    process($r) {
        $($r.el).val([]);
        //$($r.el + ' option').prop('selected', false).change();
        //$("'" + $r.el + " option[value=" + $r.value + "]'").prop('selected', false).change();
    }
}

class cmdFocus {
    process($r) {
        if($($r.el).is('div')) {
            $('html, body').animate({ scrollTop: $($r.el).offset().top }, 'fast');
            return;
        }

        $($r.el).focus();
    }
}

class cmdModalHide {
    process($r) {
        $($r.el).modal('hide');
    }
}

class cmdModalShow {
    process($r) {
        $($r.el).modal('show');
    }
}

class cmdScrollTo {
    process($r) {
        //$(window).scrollTop($($r.el).offset().top);
        $('html, body').animate({ scrollTop: $($r.el).offset().top }, $r.speed);
    }
}

class cmdOnClick {
    // https://stackoverflow.com/questions/12284168/adding-onclick-event-dynamically-using-jquery
    process($r) {
        // remove previous onClick function of the element
        $($r.el).removeAttr('onclick');

        var F = new Function ($r.function);
        $($r.el).onClick = F();
    }
}

// add js command or functions in the head section
class cmdAppendJs {
    process($r) {
        $('<script>')
            .attr('id', $r.el)
            .attr('type', 'text/javascript')
            .text($r.js)
            .appendTo('head');
    }
}

// remove js command or functions
// by removing their container which could 
// be script or div 
class cmdRemoveJs {
    process($r) {
        $($r.el).remove();
    }
}

// insert a js file into the head section
class cmdInsertJsFile {
    process($r) {
        $('head').append('<script type="text/javascript" src="' + $rs.jsFileUrl + '" id="' + $r.el + '"></script>');
    }
}

class xjxClass {
    // xjx constructor to initialize
    // and map array of objects to their respective commands / statements
    constructor() {
        this.cmds = [];
        this.cmds['val'] = new cmdVal;
        this.cmds['html'] = new cmdHtml;
        this.cmds['alert'] = new cmdAlert;
        this.cmds['append'] = new cmdAppend;
        this.cmds['prepend'] = new cmdPrepend;
        this.cmds['clear'] = new cmdClear;
        this.cmds['remove'] = new cmdRemove;
        this.cmds['hide'] = new cmdHide;
        this.cmds['show'] = new cmdShow;
        this.cmds['js'] = new cmdJs;
        this.cmds['refresh'] = new cmdRefresh;
        this.cmds['redirect'] = new cmdRedirect;
        this.cmds['prop'] = new cmdProp;
        this.cmds['toggle'] = new cmdToggle;
        this.cmds['css'] = new cmdCss;
        this.cmds['click'] = new cmdClick;
        this.cmds['add class'] = new cmdAddClass;
        this.cmds['remove class'] = new cmdRemoveClass;
        this.cmds['debug'] = new cmdDebug;
        this.cmds['check'] = new cmdCheck;
        this.cmds['uncheck'] = new cmdUncheck;
        this.cmds['select'] = new cmdSelect;
        this.cmds['unselect'] = new cmdUnselect;
        this.cmds['focus'] = new cmdFocus;
        this.cmds['modalHide'] = new cmdModalHide;
        this.cmds['modalShow'] = new cmdModalShow;
        this.cmds['scrollTo'] = new cmdScrollTo;
        this.cmds['call'] = new cmdCall;
        this.cmds['onClick'] = new cmdOnClick;
        this.cmds['appendJs'] = new cmdAppendJs;
        this.cmds['removeJs'] = new cmdRemoveJs;
        this.cmds['insertJsFile'] = new cmdInsertJsFile;
    }

    /**
     *  Form submit
     *  @param name of method or function in php script to call
     *  @param... additional parameters separated by comma
     *  e.g. xjx.form('foo', 'param1', 'param2', ..., 'paramN')
     */        
    form() {
        // initialize main json array
        var json = {};

        // get the url of the page
        var url = window.location.href.split('?')[0];

        // flag that this submit is to be handled by xjx Engine
        json._xjxEngine = 1;
        
        // flag this as a POST submit
        json.submitType = 'POST';


        // firt argument is the method or function name to call at server side
        json.method  = arguments[ 0 ];
        
        // get all input elements (input, radio, select, textarea, checkbox, file)
        // of the target form
        var data = new FormData(document.querySelector('form'));

        // convert to json string as key-value pairs
        var jsonD = JSON.stringify(Array.from(data).reduce((o,[k,v])=>(o[k]=v,o),{}));

        // initialize array to handle checkboxes and select options (single or multiple)
        var selected = [];

        // associative arrays in js do not have a length method or field
        // selected.length will return 0 even if it is not empty
        // we use a counter 
        var ctrSelected = 0;
        var key;

        // handle checkboxes
        $("form input[type*=checkbox]").each(function() {
            if ($(this).is(":checked")) {
                key = $(this).attr('name');
                if(!(key in selected)) {
                    selected[key] = [];
                }
                ctrSelected++;
                selected[key].push($(this).attr('value'));
            }                
        })

        // handle select options
        $("form :selected").each(function() {
            key = $(this).parent().attr('name');
            if(!(key in selected)) {
                selected[key] = [];
            }
            ctrSelected++;
            selected[key].push($(this).attr('value'));
        })

        // associative arrays will return 0 for length
        // therefore we use a different counter
        if(ctrSelected > 0) {
            // convert to associative array
            var mJson = JSON.parse(jsonD);

            // traverse selected
            for(key in selected) {
                // if there are multiple selections
                if(selected[key].length > 1) {
                    mJson[key] = selected[key]; 

                // only 1 selection                
                } else {
                    mJson[key] = selected[key][0];
                }
            }

            // convert back to json string then
            // pass to formParams
            json.formParams = JSON.stringify(mJson);

        } else {

            json.formParams = jsonD;
        }

        // prepare for additional parameters
        json.additionalParams = [];

        // all other arguments are treated as additional parameters
        // and are not part of the form
        if(arguments.length > 1) {
            var args = {};
            for(var i = 1; i < arguments.length; i++) {
                args[ i - 1 ] = arguments[ i ];
            }

            // convert to json string as just array of values
            json.additionalParams = { ...args }; //JSON.stringify(args);
        }  

        // do a POST submit to the current url or target url
        $.ajax({
            type: "POST",
            url: url,
            data: json, 
            success: function(response) {
                        // process the response
                        xjx.processResponse(response);
                    }
        });
    }

    /**
     *  GET submit but is converted to POS submit for security and flexibility
     *  @param name of method or function in the php script to be called
     *  @params variable number of arguments to pass to the method or function
     *  e.g. xjx.query('foo', 'Hello world...', "It's time...");
     */
    query() {
        // initialize main json array
        var json = {};

        // get url of the page
        var url = window.location.href.split('?')[0];

        // flag that this submit is to be handled by xjx Engine
        json._xjxEngine = 1;
        
        // flag this as a GET post
        json.submitType = 'GET';

        if(arguments.length == 0) {
            alert("Method name missing....");
            return;
        }

        // first argument is the method
        json.method  = arguments[ 0 ];

        // prepare the json array for query parameters
        // which would be the other arguments
        json.queryParams = [];

        console.log(arguments);
        
        if(arguments.length > 1) {
            var args = [];
            for(var i = 1; i < arguments.length; i++) {
                args.push(arguments[ i ]); 
            }

            // convert to json string as just array of values                
            json.queryParams = { ...args }; //JSON.stringify(args);
        }
        
        // do a POST submit
        $.ajax({
            type: "POST",
            url: url,
            data: json, 
            success: function(response) {
                        // process the response
                        xjx.processResponse(response);
                    }
        });
    }

    /**
     *  post only elements from a specified container (usually a div but could be a table, too)
     *  @param id of target div
     *  @param name of method to call
     *  @param... additional parameters separated by comma
     *  e.g. xjx.postPartial('foo', 'registration-div', 'param1', 'param2', ..., 'paramN')
     */
    post() {
        try {
            // initialize main json array
            var json = {};

            // get the current url
            var url = window.location.href.split('?')[0];

            // flag that this submit is to be handled by xjx Engine
            json._xjxEngine = 1;

            // flag that this is a POST suhmit
            json.submitType = 'POST';

            // first argument is the target div
            var targetDiv =  arguments[ 0 ];

            // 2nd argument is the method to call
            json.method  = arguments[ 1 ];

            // get all input elements (input, select, textarea, checkbox, raido, file) in target div
            // then serialize into array
            var data = $(targetDiv).find('select, textarea, input').serializeArray();
            //var data = $("#" + targetDiv + " *").serialize();      

            // initialize json data array
            var jsonD = {};

            // convert data to key-value pairs
            $(data ).each(function(index, obj){
                jsonD[obj.name] = obj.value;
            });                                                  

            // initialize array to handle checkboxes and select options (single or multiple)
            var selected = [];

            // associative arrays in js do not have a length method or field
            // selected.length will return 0 even if it is not empty
            var ctrSelected = 0;
            var key;

            // handle checkboxes
            //$("form input[type*=checkbox]").each(function() {
            $(targetDiv + " input[type*=checkbox]").each(function() {
                if ($(this).is(":checked")) {
                    key = $(this).attr('name');
                    if(!(key in selected)) {
                        selected[key] = [];
                    }
                    ctrSelected++;
                    selected[key].push($(this).attr('value'));
                }                
            })

            // handle select options
            //$("form :selected").each(function() {
            $(targetDiv + " :selected").each(function() {
                key = $(this).parent().attr('name');
                if(!(key in selected)) {
                    selected[key] = [];
                }
                ctrSelected++;
                $('#debug').append(key);
                selected[key].push($(this).attr('value'));
            })

            // if selected array is not empty
            // add each element to the form array
            if(ctrSelected > 0) {
                // traverse selected
                for(key in selected) {
                    // if there are multiple selections
                    if(selected[key].length > 1) {
                        jsonD[key] = selected[key]; 

                    // only 1 selection                
                    } else {
                        jsonD[key] = selected[key][0];
                    }
                }
            }

            // convert to json
            json.formParams = JSON.stringify(jsonD);

            // initialize json array for additional parameters
            json.additionalParams = [];

            // get all other arguments
            if(arguments.length > 2) {
                var args = {};
                for(var i = 2; i < arguments.length; i++) {
                    args[ i - 1 ] = arguments[ i ];
                }

                // convert to json array of values
                json.additionalParams = { ...args }; //JSON.stringify(args);
            }  

            // do a POST submit
            $.ajax({
                type: "POST",
                url: url,
                data: json, 
                success: function(response) {
                            // process the response
                            //xjx.processResponse(response);
                            xjx.processResponse(response);
                        }
            });

        } catch (err) {
            alert(err.message);
            $('#debug').append("<pre>" + $err.message + "</pre>");
        }
    }

    /**
     * processResponse -- process the response from calls of
     * xjx.post, xjx.query and xjx.postPartial
     * @param = json string containing commands
     */
    processResponse($response) {
        var $switches;
        var $i;
        var $r;

        try {
            $switches = JSON.parse($response);
            
        } catch(e) {
            $('#debug').append("<pre>" + $response + "</pre>");
            return;
        }

        for($i in $switches) {
            $r = $switches[ $i ];

            if(!($r.cmd in this.cmds)) {
                continue;
            }

            this.cmds[$r.cmd].process($r);
        }
    }
}

xjx = new xjxClass();