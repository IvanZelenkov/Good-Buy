export const handlePopupClose = (setShowPopup) => {
	setShowPopup(false);
	localStorage.setItem("popupClosed", JSON.stringify(true));
	setTimeout(() => {
		localStorage.removeItem("popupClosed");
	}, 1800000); // 30 minutes

	window.addEventListener("beforeunload", () => {
		localStorage.removeItem("popupClosed");
	});
};