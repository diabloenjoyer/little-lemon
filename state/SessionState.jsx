import { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOT_REGISTERED_PREFERENCE_INITIAL_STATE = {
	orderStatuses: "",
	passwordChanges: "",
	specialOffers: "",
	newsletter: "",
	imageUrl: null,
};

const sessionContext = createContext();

const SessionState = ({ children }) => {
	const [sessionState, updateSessionState] = useReducer(
		(prevState, newState) => ({ ...prevState, ...newState }),
		{
			session: null,
			isInitialLoading: true,
		}
	);

	const registerNewUser = (dataObj) => {
		try {
			const dataStr = JSON.stringify({
				...NOT_REGISTERED_PREFERENCE_INITIAL_STATE,
				...dataObj,
			});
			AsyncStorage.setItem("session", dataStr, () => {
				updateSessionState({
					session: JSON.parse(dataStr),
				});
			});
		} catch (error) {
			console.log(error);
		}
	};

	const logOut = (callback) => {
		AsyncStorage.clear(callback);
		updateSessionState({
			session: null,
		});
	};

	const getSession = async () => {
		try {
			const session = await AsyncStorage.getItem("session");
			if (!session) {
				throw new Error("Missing session");
			}

			updateSessionState({
				session: JSON.parse(session),
				isInitialLoading: false,
			});
		} catch (error) {
			console.log(error);
			updateSessionState({ session: null, isInitialLoading: false });
		}
	};

	useEffect(() => {
		if (sessionState.session) return () => {};

		(async () => {
			await getSession();
		})();

		return () => {};
	}, []);

	return (
		<sessionContext.Provider
			value={{
				session: sessionState.session,
				registerNewUser,
				updateUser: registerNewUser, // In this case same function can be used
				logOut,
				isInitialLoading: sessionState.isInitialLoading,
			}}
		>
			{children}
		</sessionContext.Provider>
	);
};

export const useSession = () => useContext(sessionContext);

export default SessionState;
