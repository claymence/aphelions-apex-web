import { fail } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST,
	port: Number(env.SMTP_PORT),
	secure: true,
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASS
	}
});

const RATE_LIMIT = new Map<string, number[]>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const timestamps = RATE_LIMIT.get(ip)?.filter((t) => now - t < WINDOW_MS) ?? [];
	RATE_LIMIT.set(ip, timestamps);
	if (timestamps.length >= MAX_REQUESTS) return true;
	timestamps.push(now);
	return false;
}

export const actions = {
	default: async ({ request, getClientAddress }) => {
		const ip = getClientAddress();
		if (isRateLimited(ip)) {
			return fail(429, { error: 'Too many requests. Please try again later.' });
		}

		const data = await request.formData();
		const name = data.get('name')?.toString().trim();
		const email = data.get('email')?.toString().trim();
		const message = data.get('message')?.toString().trim();
		const honeypot = data.get('website')?.toString();

		if (honeypot) {
			return { success: true };
		}

		if (!name || !email || !message) {
			return fail(400, { error: 'All fields are required.', name, email, message });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				error: 'Please enter a valid email address.',
				name,
				email,
				message
			});
		}

		if (message.length > 5000) {
			return fail(400, { error: 'Message too long.', name, email, message });
		}

		try {
			await transporter.sendMail({
				from: env.SMTP_FROM,
				to: env.SMTP_FROM,
				replyTo: email,
				subject: `Contact: ${name}`,
				text: `From: ${name} <${email}>\n\n${message}`
			});
		} catch {
			return fail(500, { error: 'Message could not be sent. Please try again later.' });
		}

		return { success: true };
	}
} satisfies Actions;
