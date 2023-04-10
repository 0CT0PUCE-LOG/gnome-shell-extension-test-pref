'use strict';

const { Adw, Gio, Gtk } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();


function init() {
}

function fillPreferencesWindow(window) {
    // Use the same GSettings schema as in `extension.js`
    const settings = ExtensionUtils.getSettings(
        'org.gnome.shell.extensions.test-pref');

    // Create a preferences page and group
    const page = new Adw.PreferencesPage();
    const group = new Adw.PreferencesGroup();
    page.add(group);

    // Create a new preferences row
    const row_logout = new Adw.ActionRow({ title: 'Show Extension Indicator' });
    group.add(row_logout);

    const row_reboot = new Adw.ActionRow({ title: 'Show Extension Indicator2' });
    group.add(row_reboot);

    const row_shutdown = new Adw.ActionRow({ title: 'Show Extension Indicator3' });
    group.add(row_shutdown);

    // Create the switch and bind its value to the `show-indicator` key
    const toggle_logout = new Gtk.Switch({
        active: settings.get_boolean ('show-indicator'),
        valign: Gtk.Align.CENTER,
    });
    const toggle_reboot = new Gtk.Switch({
        active: settings.get_boolean ('show-indicator2'),
        valign: Gtk.Align.CENTER,
    });
    const toggle_shutdown = new Gtk.Switch({
        active: settings.get_boolean ('show-indicator3'),
        valign: Gtk.Align.CENTER,
    });
    settings.bind(
        'show-indicator',
        toggle_logout,
        'active',
        'show-indicator2',
        toggle_reboot,
        'active',
        'show-indicator3',
        toggle_shutdown,
        'active',
        Gio.SettingsBindFlags.DEFAULT
    );

    // Add the switch to the row
    row_logout.add_suffix(toggle_logout);
    row_logout.activatable_widget = toggle_logout;
    row_reboot.add_suffix(toggle_reboot);
    row_reboot.activatable_widget = toggle_reboot;
    row_shutdown.add_suffix(toggle_shutdown);
    row_shutdown.activatable_widget = toggle_shutdown;

    // Add our page to the window
    window.add(page);
}