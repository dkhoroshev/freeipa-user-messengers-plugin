define([
        'freeipa/phases',
        'freeipa/ipa'],
        function(phases, IPA) {

// helper function
function get_item(array, attr, value) {

    for (var i=0,l=array.length; i<l; i++) {
        if (array[i][attr] === value) return array[i];
    }
    return null;
}

var user_messenger_plugin = {};

// adds 'messengerTelegram' field into user details facet
userstatus_plugin.add_user_status_pre_op = function() {

    var facet = get_item(IPA.user.entity_spec.facets, '$type', 'details');
    var section = get_item(facet.sections, 'name', 'contact');
    section.fields.push({
                            name: 'messengerTelegram',
                            flags: ['w_if_no_aci'],
                            lable: 'Telegram Nickname',
                            tooltip: {
                                title: 'Without "@" and "http://t.me/..."',
                                html: true
                            },
    });
    return true;
};

phases.on('customization', userstatus_plugin.add_user_status_pre_op);

return userstatus_plugin;
});
