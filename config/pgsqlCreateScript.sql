CREATE TABLE prayerRequest (
	requestDateTime VARCHAR ( 255 ) PRIMARY KEY,
	requestTitle VARCHAR ( 100 ) NOT NULL,
	requestCategory VARCHAR ( 150 ) NOT NULL,
	requestDetails VARCHAR ( 255 ) NOT NULL,
	requestStatus VARCHAR ( 10 ) NOT NULL
);

INSERT INTO public.prayerrequest(requestdatetime, requesttitle, requestcategory, requestdetails, requeststatus)
VALUES ('1696566997', 'Test Title', 'Health & Safety', 'Test Details', 'active');