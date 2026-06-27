## DNS stands for Domain Name System. It is a distributed naming system that translates human-readable domain names, such as google.com, into IP addresses. Computers communicate using IP addresses, while humans prefer domain names because they are easier to remember. Without DNS, users would need to remember the IP address of every website they wanted to visit, making the internet much less user-friendly.


# When you type google.com, does your computer directly contact the DNS server every time?
The browser first checks its own DNS cache, then the OS cache. If the IP address is found, it skips the DNS lookup and immediately starts establishing the TCP connection. This makes the request faster by reducing the time spent resolving the domain name.