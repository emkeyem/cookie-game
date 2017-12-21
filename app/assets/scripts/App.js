import Model from "./modules/model";
import DB from "./modules/db";
import Controller from "./modules/controller";
import View from "./modules/view";



var controller = new Controller(Model);
var view = new View(controller);
var db = new DB("store", "cookie_clicker", Model, view);

db.init(view);

