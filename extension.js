const Gio = imports.gi.Gio;
const St = imports.gi.St;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;


class Extension {
    constructor() {
        this._indicator = null;
    }

    enable() {
        log(`enabling ${Me.metadata.name}`);

        this.settings = ExtensionUtils.getSettings(
            'org.gnome.shell.extensions.test-pref');

        //building icons
        let indic_logout = `${Me.metadata.name} indic_logout`;
        let indic_reboot = `${Me.metadata.name} indic_reboot`;
        let indic_shutdown = `${Me.metadata.name} indic_shutdown`;

        // Create panel buttons
        this._indicator = new PanelMenu.Button(0.0, indic_logout, false);
        this._indicator2 = new PanelMenu.Button(0.0, indic_reboot, false);
        this._indicator3 = new PanelMenu.Button(0.0, indic_shutdown, false);

        // Add icons
        let icon_logout = new St.Icon({
            icon_name: "system-log-out-symbolic",
            style_class: "system-status-icon"
        });
        let icon_reboot = new St.Icon({
            gicon: new Gio.ThemedIcon({name: 'face-laugh-symbolic'}),
            style_class: 'system-status-icon'
        });
        let icon_shutdown = new St.Icon({
            icon_name: "system-shutdown-symbolic",
            style_class: "system-status-icon"
        });

        this._indicator.add_child(icon_logout);
        this._indicator2.add_child(icon_reboot);
        this._indicator3.add_child(icon_shutdown);

        // Bind our indicator visibility to the GSettings value
        //
        // NOTE: Binding properties only works with GProperties (properties
        // registered on a GObject class), not native JavaScript properties
        this.settings.bind(
            'show-indicator',
            this._indicator,
            'visible',
            'show-indicator3',
            this._indicator3,
            'visible',
            Gio.SettingsBindFlags.DEFAULT
        );
        this.settings.bind(
            'show-indicator2',
            this._indicator2,
            'visible',
            Gio.SettingsBindFlags.DEFAULT
        )

        Main.panel.addToStatusArea(indic_logout, this._indicator);
        Main.panel.addToStatusArea(indic_reboot, this._indicator2);
        Main.panel.addToStatusArea(indic_shutdown, this._indicator3);
    }

    disable() {
        log(`disabling ${Me.metadata.name}`);

        this._indicator.destroy();
        this._indicator = null;
        this._indicator2.destroy();
        this._indicator2 = null;
        this._indicator3.destroy();
        this._indicator3 = null;
    }
}


function init() {
    log(`initializing ${Me.metadata.name}`);

    return new Extension();
}