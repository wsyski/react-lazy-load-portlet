var LiferayUtil = function () {
    function LiferayUtil() {
    }

    LiferayUtil.isPortal = function isPortal() {
        return typeof window.Liferay.once !== 'undefined';
    };

    LiferayUtil.setLiferayParamsDefaults = function setLiferayParamsDefaults(
		liferayParams,
		portletInstance,
		system
	) {
		let liferayParamsConfiguration = liferayParams.configuration;
		if (portletInstance) {
			liferayParamsConfiguration = {
				...liferayParamsConfiguration,
				portletInstance: {...portletInstance, ...liferayParamsConfiguration.portletInstance},
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

	return LiferayUtil;
}();

export default LiferayUtil;
