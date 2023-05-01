export const handlePopupClose = (setShowPopup) => {
	setShowPopup(false);
	localStorage.setItem("popupClosed", "true");
	setTimeout(() => {
		localStorage.removeItem("popupClosed");
	}, 1800000); // 30 minutes

	window.addEventListener("beforeunload", () => {
		localStorage.removeItem("popupClosed");
	});
};