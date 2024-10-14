#!/bin/bash

# Create new topic with number of partition
kafka-topics --create --bootstrap-server localhost:9093 --replication-factor 1 --partitions 2 --topic main-topic

# View Topic detail
kafka-topics --describe --bootstrap-server localhost:9093 --topic main-topic

# Update number of partition of topic
kafka-topics --alter --bootstrap-server localhost:9093 --topic main-topic --partitions 3

# Update configuration of topic
kafka-configs --bootstrap-server localhost:9093 --entity-type topics --entity-name main-topic --alter --add-config retention.ms=60000

# View messages in topic
kafka-console-consumer --bootstrap-server localhost:9093 --topic main-topic --from-beginning
