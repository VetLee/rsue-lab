require 'nokogiri'
require 'open-uri'

class Main
  URLS = [
    'https://rsue.ru/',
    'https://rsue.ru/prepodavateli.php?ELEMENT_ID=679'
  ]

  def self.run
    URLS.each do |url|
      puts "\n#{url}:\n"
      doc = Nokogiri::HTML open url
      doc.css('a').each do |link|
        next if link['href'] == nil
        href = link['href'].gsub(/\s+/, '')
        next if link.text == nil
        text = link.text.gsub(/\s+/, '')
        next if text !~ /[^[:space:]]/
        puts "\t#{text} - #{href}"
      end
      puts "\n\n"
    rescue => e
      puts "Cant parse \"#{url}\": #{e}"
    end
  end
end

Main.run
