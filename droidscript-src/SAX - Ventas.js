
cfg.Dark;

function OnStart () {
    app.SetOnShowKeyboard( OnKeyboard );
    lay = app.CreateLayout("linear", "vcenter,fillXY");
    web = app.CreateWebView(1, 1);
    web.SetBackColor( "#222222" )
    
    if (app.IsAPK()) web.LoadUrl("./Html/index.html"); 
    else web.LoadUrl("http://localhost:3000"); 
    
    lay.AddChild(web);
    app.AddLayout(lay);
}


/**
 * App Event: rotate phone
 */
function OnConfig () {
    let show = app.IsKeyboardShown();
    OnKeyboard(show);
}


/**
 * Event: show keyboard
 */
function OnKeyboard (show) {
    if (show) {
        let width = app.GetScreenWidth();
        let height = app.GetDisplayHeight() - app.GetKeyboardHeight();
        web.SetSize(width, height, "px");
    } 
    else web.SetSize(1, 1);
}