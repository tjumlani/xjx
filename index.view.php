
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script type="text/javascript" src='jquery-3.3.1.js'></script>
<script type="text/javascript" src="xjx.js"></script>

<style>
    div {
        padding:5px;
    }
</style>

</head>
<body>
    <form name='form' id='form'>
        <input type='hidden' name='hidden_field' id='hidden_field' value="I am from a hidden fields">

        <div><input type='button' value='Say Something' onClick="xjx.query('saySomething')"></div>
        
        <div >
            <div>Type Something: <input id='typed' name='typed' value='Hi babe'></div>
            <div>Another text box: <input id='another' name='another' disabled value='Hello babe'></div>
            <div><input type='button' value='Echoing what you typed...' onClick="xjx.query('echoBack', $('#typed').val(), 'a long time ago')"></div>
        </div>

        <div>
            <input name='choices' value='1' type='checkbox'>Choice 1
        </div>
        <div>
            <input name='choices' value='2' type='checkbox'>Choice 2
        </div>
        <div>
            <input name='choices' value='3' type='checkbox'>Choice 3
        </div>
        <div>
            <input name='choices' id='choices3' value='4' type='checkbox'>Choice 4
        </div>

        <div>
            <select name='select_multiple' id='select_multiple' multiple="multiple">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>
        </div>

        <div >
            <input type='button' value='Click Me to Post Form' onClick="xjx.form('Post1', 'something else', 'and another')">
        </div >

        <hr />
        <div id='div-to-post'>
            <div>
                <input name='achoices[]' value='1' type='checkbox'>Choice 1
            </div>
            <div>
                <input name='achoices[]' value='2' type='checkbox'>Choice 2
            </div>
            <div>
                <input name='achoices[]' value='3' type='checkbox'>Choice 3
            </div>
            <div>
                <input name='achoices[]' id='choices3' value='4' type='checkbox'>Choice 4
            </div>
            <div>Post Div variable: <input id='post_div_var' name='post_div_var' value='Hi babe from Div Post'></div>
            <div>Post Div variable: <input id='post_div_var1' name='post_div_var1' value='Hi babe another from Div Post'></div>            
            <div><input type='button' value='Echoing Post Div..' onClick="xjx.post('postDivResult', '#div-to-post', 'an extra value', 'another value')"></div>
        </div>

        <hr />
        <div id='result'>Waiting for a handshake...</div>

        <hr />
        <div >Debug</div>
        <div id='debug'></div>
        
    </form>
</body>
</html>