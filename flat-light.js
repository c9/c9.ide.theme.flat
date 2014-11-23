define(function(require, exports, module) {
    main.consumes = [
        "Plugin", "layout", "menus"
    ];
    main.provides = ["theme.flat-light"];
    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var menus = imports.menus;
        var layout = imports.layout;
        
        /***** Initialization *****/
        
        var plugin = new Plugin("Ajax.org", main.consumes);
        var emit = plugin.getEmitter();
        
        var oldHeight;
        var oldMinimizedHeight;
        
        var loaded = false;
        function load() {
            if (loaded) return false;
            loaded = true;
            
            var update = function(e){
                if (e.theme == "flat-light") {
                    layout.getElement("logobar").setHeight(40);
                    oldHeight = menus.height;
                    oldMinimizedHeight = menus.minimizedHeight;
                    
                    menus.height = 40;
                    menus.minimizedHeight = 8;
                }
                else if (e.oldTheme == "flat-light") {
                    layout.getElement("logobar").setHeight(31);
                    
                    menus.height = oldHeight;
                    menus.minimizedHeight = oldMinimizedHeight;
                }
            };
            
            layout.on("themeChange", update);
            
            if (layout.theme == "flat-light")
                update({ theme: layout.theme });
        }
        
        var drawn = false;
        function draw() {
            if (drawn) return;
            drawn = true;
            
            emit("draw");
        }
        
        /***** Methods *****/
        
        /***** Lifecycle *****/
        
        plugin.on("load", function() {
            load();
        });
        plugin.on("enable", function() {
            
        });
        plugin.on("disable", function() {
            
        });
        plugin.on("unload", function() {
            loaded = false;
            drawn = false;
        });
        
        /***** Register and define API *****/
        
        /**
         * 
         **/
        plugin.freezePublicAPI({
            
        });
        
        register(null, {
            "theme.flat-light": plugin
        });
    }
});