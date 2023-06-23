"use client";

import * as React from "react";
import { useLoadingCallback } from "react-loading-hook";
import { useRouter } from "next/navigation";
import { Button, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useAuth } from "../../auth/hooks";
import styles from "./UserProfile.module.css";
import { useFirebaseAuth } from "../../auth/firebase";
import { clientConfig } from "../../config/client-config";

export function UserProfile() {
	const router = useRouter();
	const { tenant } = useAuth();
	const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
	const [hasLoggedOut, setHasLoggedOut] = React.useState(false);
	const [handleLogout, isLogoutLoading] = useLoadingCallback(async () => {
		const auth = await getFirebaseAuth();
		const { signOut } = await import("firebase/auth");
		await signOut(auth);
		setHasLoggedOut(true);
		await fetch("/api/logout", {
			method: "GET",
		});
		window.location.reload();
	});

	const [handleRefresh, isRefreshLoading] = useLoadingCallback(async () => {
		if (!tenant) {
			return;
		}

		await fetch("/api/refresh-tokens", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${tenant.idToken}`,
			},
		});
	});

	const [handleClaims, isClaimsLoading] = useLoadingCallback(async () => {
		if (!tenant) {
			return;
		}

		await fetch("/api/custom-claims", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${tenant.idToken}`,
			},
		});
	});

	const [handleUserCounter, isUserCounterLoading] = useLoadingCallback(
		async () => {
			if (!tenant) {
				return;
			}

			await fetch("/api/user-counters", {
				method: "POST",
			});
		}
	);

	function handleRedirect() {
		router.push(
			`${clientConfig.redirectUrl}?redirect_url=${window.location.href}`
		);
	}

	if (!tenant && hasLoggedOut) {
		return (
			<div className={styles.container}>
				<h3 className={styles.title}>
					You are being logged out... <CircularProgress />
				</h3>
			</div>
		);
	}

	if (!tenant) {
		return null;
	}

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>You are logged in as</h3>
			<div className={styles.content}>
				<div className={styles.avatar}>
					{tenant.photoUrl && (
						<Image alt="user image" src={tenant.photoUrl} />
					)}
				</div>
				<span>{tenant.email}</span>
			</div>
			<div className={styles.buttonGroup}>
				<Button disabled={isClaimsLoading} onClick={handleClaims}>
					{isClaimsLoading ? (
						<CircularProgress />
					) : (
						"Set custom user claims"
					)}
				</Button>
				<Button disabled={isRefreshLoading} onClick={handleRefresh}>
					{isRefreshLoading ? <CircularProgress /> : "Refresh tokens"}
				</Button>
				<Button
					disabled={isUserCounterLoading}
					onClick={handleUserCounter}
				>
					{isUserCounterLoading ? (
						<CircularProgress />
					) : (
						"Update user counter in database"
					)}
				</Button>

				<Button disabled={isLogoutLoading} onClick={handleLogout}>
					{isLogoutLoading ? <CircularProgress /> : "Log Out"}
				</Button>

				<Button onClick={handleRedirect}>Redirect</Button>
			</div>
		</div>
	);
}
