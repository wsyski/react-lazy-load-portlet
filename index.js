import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from "./AppComponent";

var PORTLET_NAMESPACE_DEFAULT = '_portlet_namespace_';

var LIFERAY_PARAMS_DEFAULT = {
	configuration: {
		portletInstance: {},
		system: {},
	},
	contextPath: '',
	portletElementId: 'js-portlet-' + PORTLET_NAMESPACE_DEFAULT,
	portletNamespace: PORTLET_NAMESPACE_DEFAULT,
};

var DRINK = 'drink';

var PORTLET_INSTANCE_DEFAULT = {
	[DRINK]: 'orange',
};

function setLiferayParamsDefaults(
	liferayParams,
	portletInstance,
	system
) {
	let liferayParamsConfiguration = liferayParams.configuration;
	if (portletInstance) {
		liferayParamsConfiguration = {
			...liferayParamsConfiguration,
			portletInstance: {
				...portletInstance,
				...liferayParamsConfiguration.portletInstance,
			},
		};
	}
	if (system) {
		liferayParamsConfiguration = {
			...liferayParamsConfiguration,
			system: {...system, ...liferayParamsConfiguration.system},
		};
	}

	return {...liferayParams, configuration: liferayParamsConfiguration};
}


export default function index(liferayParams) {
	var liferayParamsWithDefaults = setLiferayParamsDefaults(
		liferayParams,
		PORTLET_INSTANCE_DEFAULT,
		undefined
	);
	var portletElement = document.getElementById(liferayParamsWithDefaults.portletElementId);
	var markup = React.createElement(AppComponent, {
			liferayParams: liferayParamsWithDefaults,
		});
	ReactDOM.render(
		process.env.NODE_ENV === 'development' ? (
			<React.StrictMode>{markup}</React.StrictMode>
		) : (
			<React.Fragment>{markup}</React.Fragment>
		),
		portletElement
	);
	if (process.env.NODE_ENV !== 'development') {
		Liferay.once('destroyPortlet', () => {
			ReactDOM.unmountComponentAtNode(portletElement);
		});
	}
};

if (process.env.NODE_ENV === 'development') {
	index(LIFERAY_PARAMS_DEFAULT);
}

