

Feature: Client Communicates Order to Aporo
    Each time a Client prints an Order with an authenticated
    Aporo Printer Driver ("Driver"), the Driver, in a matter of milliseconds:
        (a) submits authentication credentials to Aporo,
        (b) receives an Order Tag and destination URL for submitting the Order,
        (c) transmits the Order to the destination URL, and
        (d) prints out the Order with the Order Tag at the local printer
                designated by the Client.
    .




# Planned/Upcoming Features:
#   -content authentication to minimize/eliminate a Client's non-order transmission
#   -immediate communication via email for any/all non-order transmissions and enclose PDF
#   -pop-up/audio client notification for new order from non-authenticated driver

#Feature: Zero-Downtime Configuration
  #Redirect Driver to secondary and tertiary servers for processing
