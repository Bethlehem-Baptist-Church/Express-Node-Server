CREATE TABLE prayer_request (
	request_created_dt VARCHAR ( 255 ) PRIMARY KEY,
	request_category VARCHAR ( 150 ) NOT NULL,
	request_details VARCHAR ( 255 ) NOT NULL,
	request_status VARCHAR ( 10 ) NOT NULL
);

INSERT INTO public.prayer_request(
	request_created_dt,
	request_category,
	request_details,
	request_status
) VALUES (
	'1696566997',
	'Health & Safety',
	'Please pray for my surgery on Tuesday to go well.',
	'active'
);

INSERT INTO public.prayer_request(
	request_created_dt,
	request_category,
	request_details,
	request_status
) VALUES (
	'1696566997',
	'Guidance & Wisdom',
	'Pray for me to make the right decision about my next job.',
	'active'
);

INSERT INTO public.prayer_request(
	request_created_dt,
	request_category,
	request_details,
	request_status
) VALUES (
	'1696566997',
	'Strength & Courage',
	'Please give me the strength to get through my recruitment phase at work.',
	'inactive'
);

INSERT INTO public.prayer_request(
	request_created_dt,
	request_category,
	request_details,
	request_status
) VALUES (
	'1696566997',
	'Recovery & Renewal',
	'Pray for my Grandmother as she is recovering from pain in her abdomen.',
	'active'
);